import React, { useState, useMemo } from "react";
import { healthEventsClient } from "@/api/healthEventsClient";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  Calendar,
  Bell,
  Cloud,
  RefreshCw,
  Activity,
  List,
  Building2,
  AlertOctagon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import StatusCard from "../components/dashboard/StatusCard";
import IncidentTable from "../components/dashboard/IncidentTable";
import IncidentDetail from "../components/dashboard/IncidentDetail";
import FilterBar from "../components/dashboard/FilterBar";
import AccountGroupView from "../components/dashboard/AccountGroupView";

export default function Dashboard() {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'account'
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    actionability: "",
    environment: "",
    service: "",
    region: "",
    status: "",
  });

  const {
    data: incidents = [],
    isLoading,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["incidents"],
    queryFn: () => healthEventsClient.entities.Incident.list("-startTime", 100),
    refetchInterval: 60000, // Refresh every minute
  });

  // Compute stats
  const stats = useMemo(() => {
    const openIssues = incidents.filter(
      (i) => i.category === "issue" && i.status === "open"
    );
    const scheduled = incidents.filter(
      (i) => i.category === "scheduledChange" && i.status !== "closed"
    );
    const notifications = incidents.filter(
      (i) => i.category === "accountNotification" && i.status !== "closed"
    );
    const actionRequired = incidents.filter(
      (i) => i.actionability === "ACTION_REQUIRED" && i.status !== "closed"
    ).length;
    const prdAffected = openIssues.filter(
      (i) => i.environment === "PRD"
    ).length;

    return {
      openIssues: openIssues.length,
      scheduled: scheduled.length,
      notifications: notifications.length,
      actionRequired,
      prdAffected,
    };
  }, [incidents]);

  // Extract unique services and regions for filters
  const { services, regions } = useMemo(() => {
    const svcSet = new Set();
    const regSet = new Set();
    incidents.forEach((i) => {
      if (i.service) svcSet.add(i.service);
      if (i.region) regSet.add(i.region);
    });
    return {
      services: Array.from(svcSet).sort(),
      regions: Array.from(regSet).sort(),
    };
  }, [incidents]);

  // Apply filters
  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          incident.title?.toLowerCase().includes(searchLower) ||
          incident.service?.toLowerCase().includes(searchLower) ||
          incident.region?.toLowerCase().includes(searchLower) ||
          incident.eventArn?.toLowerCase().includes(searchLower) ||
          incident.accountAlias?.toLowerCase().includes(searchLower) ||
          incident.accountId?.includes(searchLower);
        if (!matchesSearch) return false;
      }
      if (filters.category && incident.category !== filters.category)
        return false;
      if (
        filters.actionability &&
        incident.actionability !== filters.actionability
      )
        return false;
      if (filters.environment && incident.environment !== filters.environment)
        return false;
      if (filters.service && incident.service !== filters.service) return false;
      if (filters.region && incident.region !== filters.region) return false;
      if (filters.status && incident.status !== filters.status) return false;
      return true;
    });
  }, [incidents, filters]);

  // Sort: Actionability priority first, then category, then last update time
  const sortedIncidents = useMemo(() => {
    const actionabilityOrder = {
      ACTION_REQUIRED: 0,
      ACTION_MAY_BE_REQUIRED: 1,
      INFORMATIONAL: 2,
    };
    const categoryOrder = {
      issue: 0,
      scheduledChange: 1,
      accountNotification: 2,
    };

    return [...filteredIncidents].sort((a, b) => {
      // 1. Actionability priority
      const actionDiff =
        (actionabilityOrder[a.actionability] ?? 9) -
        (actionabilityOrder[b.actionability] ?? 9);
      if (actionDiff !== 0) return actionDiff;

      // 2. Event category
      const catDiff =
        (categoryOrder[a.category] ?? 9) - (categoryOrder[b.category] ?? 9);
      if (catDiff !== 0) return catDiff;

      // 3. Last update time (most recent first)
      const aTime = a.lastUpdatedTime
        ? new Date(a.lastUpdatedTime)
        : new Date(0);
      const bTime = b.lastUpdatedTime
        ? new Date(b.lastUpdatedTime)
        : new Date(0);
      return bTime - aTime;
    });
  }, [filteredIncidents]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Cloud className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-100">
                  AWS Health Events Dashboard
                </h1>
                <p className="text-xs text-slate-400">
                  Multi-Account Infrastructure Health Monitoring | Real-time
                  Service Status & Cost Impact Analysis
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-400">Last updated</p>
                <p className="text-sm text-slate-300">
                  {dataUpdatedAt
                    ? format(new Date(dataUpdatedAt), "HH:mm:ss")
                    : "—"}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isLoading}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard
            title="Action Required"
            count={stats.actionRequired}
            icon={AlertOctagon}
            variant={stats.actionRequired > 0 ? "critical" : "success"}
            subtitle={
              stats.actionRequired > 0 ? "Needs attention" : "All clear"
            }
          />
          <StatusCard
            title="Open Issues"
            count={stats.openIssues}
            icon={AlertTriangle}
            variant={stats.openIssues > 0 ? "warning" : "success"}
          />
          <StatusCard
            title="Scheduled Changes"
            count={stats.scheduled}
            icon={Calendar}
            variant={stats.scheduled > 0 ? "info" : "default"}
            subtitle={
              stats.scheduled > 0 ? "Upcoming maintenance" : "None scheduled"
            }
          />
          <StatusCard
            title="Notifications"
            count={stats.notifications}
            icon={Bell}
            variant="default"
          />
        </div>

        {/* Filters */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          services={services}
          regions={regions}
        />

        {/* Incidents View */}
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-100">
              Events
              <span className="ml-2 text-sm font-normal text-slate-400">
                ({sortedIncidents.length}{" "}
                {sortedIncidents.length === 1 ? "event" : "events"})
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "table" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className={
                  viewMode === "table"
                    ? "bg-slate-700 text-slate-100"
                    : "text-slate-400 hover:text-slate-100"
                }
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
              <Button
                variant={viewMode === "account" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("account")}
                className={
                  viewMode === "account"
                    ? "bg-slate-700 text-slate-100"
                    : "text-slate-400 hover:text-slate-100"
                }
              >
                <Building2 className="h-4 w-4 mr-1" />
                By Account
              </Button>
            </div>
          </div>

          {viewMode === "table" ? (
            <IncidentTable
              incidents={sortedIncidents}
              onSelectIncident={setSelectedIncident}
            />
          ) : (
            <div className="p-4">
              <AccountGroupView
                incidents={sortedIncidents}
                onSelectIncident={setSelectedIncident}
              />
            </div>
          )}
        </div>
      </main>

      {/* Incident Detail Sheet */}
      <IncidentDetail
        incident={selectedIncident}
        open={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
}
