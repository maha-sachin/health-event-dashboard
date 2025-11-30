import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Building2, AlertOctagon, AlertTriangle, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import EnvironmentBadge from './EnvironmentBadge';

export default function AccountGroupView({ incidents, onSelectIncident }) {
  const [expandedAccounts, setExpandedAccounts] = useState({});

  // Group incidents by account
  const accountGroups = useMemo(() => {
    const groups = {};
    incidents.forEach(incident => {
      const key = incident.accountId || 'unknown';
      if (!groups[key]) {
        groups[key] = {
          accountId: incident.accountId,
          accountAlias: incident.accountAlias,
          environment: incident.environment,
          incidents: []
        };
      }
      groups[key].incidents.push(incident);
    });

    // Sort by action required count, then by environment priority
    return Object.values(groups).sort((a, b) => {
      const aActionRequired = a.incidents.filter(i => i.actionability === 'ACTION_REQUIRED').length;
      const bActionRequired = b.incidents.filter(i => i.actionability === 'ACTION_REQUIRED').length;
      if (bActionRequired !== aActionRequired) return bActionRequired - aActionRequired;
      
      const envOrder = { PRD: 0, NPR: 1, DEV: 2, SANDBOX: 3 };
      return (envOrder[a.environment] || 9) - (envOrder[b.environment] || 9);
    });
  }, [incidents]);

  const toggleAccount = (accountId) => {
    setExpandedAccounts(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  const getActionabilitySummary = (incidents) => {
    const summary = {
      ACTION_REQUIRED: 0,
      ACTION_MAY_BE_REQUIRED: 0,
      INFORMATIONAL: 0
    };
    incidents.forEach(i => {
      if (summary[i.actionability] !== undefined) {
        summary[i.actionability]++;
      } else {
        summary.INFORMATIONAL++;
      }
    });
    return summary;
  };

  if (accountGroups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-500">
        <Building2 className="h-8 w-8 mb-3" />
        <p className="text-lg font-medium text-slate-300">No Accounts with Events</p>
        <p className="text-sm mt-1">All accounts are healthy</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {accountGroups.map((group) => {
        const isExpanded = expandedAccounts[group.accountId];
        const summary = getActionabilitySummary(group.incidents);
        
        return (
          <div key={group.accountId} className="border border-slate-800 rounded-lg overflow-hidden">
            {/* Account Header */}
            <button
              onClick={() => toggleAccount(group.accountId)}
              className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                )}
                <Building2 className="h-5 w-5 text-slate-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-200">
                    {group.accountAlias || group.accountId || 'Unknown Account'}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">{group.accountId}</p>
                </div>
                {group.environment && (
                  <EnvironmentBadge environment={group.environment} />
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {/* Actionability Summary */}
                <div className="flex items-center gap-2">
                  {summary.ACTION_REQUIRED > 0 && (
                    <span className="flex items-center gap-1 text-xs text-red-400">
                      <AlertOctagon className="h-3.5 w-3.5" />
                      {summary.ACTION_REQUIRED}
                    </span>
                  )}
                  {summary.ACTION_MAY_BE_REQUIRED > 0 && (
                    <span className="flex items-center gap-1 text-xs text-amber-400">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      {summary.ACTION_MAY_BE_REQUIRED}
                    </span>
                  )}
                  {summary.INFORMATIONAL > 0 && (
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Info className="h-3.5 w-3.5" />
                      {summary.INFORMATIONAL}
                    </span>
                  )}
                </div>
                <Badge variant="outline" className="text-slate-300 border-slate-600">
                  {group.incidents.length} {group.incidents.length === 1 ? 'event' : 'events'}
                </Badge>
              </div>
            </button>

            {/* Expanded Events List */}
            {isExpanded && (
              <div className="divide-y divide-slate-800">
                {group.incidents.map((incident) => (
                  <button
                    key={incident.id}
                    onClick={() => onSelectIncident(incident)}
                    className="w-full text-left p-4 hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <ActionabilityIndicator actionability={incident.actionability} />
                          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                            {incident.service}
                          </span>
                          <span className="text-xs text-slate-500">
                            {incident.region}
                          </span>
                        </div>
                        <p className="text-sm text-slate-200 truncate">{incident.title}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <CategoryLabel category={incident.category} />
                        <p className="text-xs text-slate-500 mt-1">
                          {incident.status}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ActionabilityIndicator({ actionability }) {
  const config = {
    ACTION_REQUIRED: { icon: AlertOctagon, className: 'text-red-400' },
    ACTION_MAY_BE_REQUIRED: { icon: AlertTriangle, className: 'text-amber-400' },
    INFORMATIONAL: { icon: Info, className: 'text-slate-400' }
  };
  const cfg = config[actionability] || config.INFORMATIONAL;
  const Icon = cfg.icon;
  return <Icon className={cn("h-4 w-4", cfg.className)} />;
}

function CategoryLabel({ category }) {
  const labels = {
    issue: { text: 'Issue', className: 'text-red-400' },
    scheduledChange: { text: 'Scheduled', className: 'text-blue-400' },
    accountNotification: { text: 'Notification', className: 'text-slate-400' }
  };
  const cfg = labels[category] || labels.issue;
  return <span className={cn("text-xs", cfg.className)}>{cfg.text}</span>;
}