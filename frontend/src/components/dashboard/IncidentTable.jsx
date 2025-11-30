import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import ActionabilityBadge from './ActionabilityBadge';
import CategoryBadge from './CategoryBadge';
import EnvironmentBadge from './EnvironmentBadge';
import { cn } from "@/lib/utils";

export default function IncidentTable({ incidents, onSelectIncident }) {
  if (!incidents || incidents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-500">
        <div className="rounded-full bg-emerald-500/10 p-4 mb-4">
          <Clock className="h-8 w-8 text-emerald-400" />
        </div>
        <p className="text-lg font-medium text-slate-300">All Systems Operational</p>
        <p className="text-sm mt-1">No active incidents at this time</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-300 font-medium">Actionability</TableHead>
              <TableHead className="text-slate-300 font-medium">Event</TableHead>
              <TableHead className="text-slate-300 font-medium">Event category</TableHead>
              <TableHead className="text-slate-300 font-medium">Service</TableHead>
              <TableHead className="text-slate-300 font-medium">Region</TableHead>
              <TableHead className="text-slate-300 font-medium">Availability Zone</TableHead>
              <TableHead className="text-slate-300 font-medium">Status / End time</TableHead>
              <TableHead className="text-slate-300 font-medium">Last update time</TableHead>
              <TableHead className="text-slate-300 font-medium w-10"></TableHead>
            </TableRow>
          </TableHeader>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow 
              key={incident.id} 
              className="border-slate-800/50 hover:bg-slate-800/30 cursor-pointer transition-colors"
              onClick={() => onSelectIncident(incident)}
            >
              <TableCell>
                <ActionabilityBadge actionability={incident.actionability} />
              </TableCell>
              <TableCell className="max-w-xs">
                <p className="text-sm text-slate-200 truncate">{incident.title}</p>
              </TableCell>
              <TableCell>
                <CategoryBadge category={incident.category} />
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm text-slate-200">{incident.service}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-slate-200">{incident.region || '—'}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm text-slate-400">{incident.availabilityZone || '—'}</span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 text-xs font-medium",
                    incident.status === 'open' && "text-red-300",
                    incident.status === 'upcoming' && "text-blue-300",
                    incident.status === 'closed' && "text-slate-400"
                  )}>
                    <span className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      incident.status === 'open' && "bg-red-400 animate-pulse",
                      incident.status === 'upcoming' && "bg-blue-400",
                      incident.status === 'closed' && "bg-slate-500"
                    )} />
                    {incident.status}
                  </span>
                  {incident.endTime && (
                    <span className="text-xs text-slate-500 mt-0.5">
                      Ends {format(new Date(incident.endTime), 'MMM d yyyy HH:mm')}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="text-xs text-slate-400">
                  {incident.lastUpdatedTime ? format(new Date(incident.lastUpdatedTime), 'MMM d yyyy HH:mm') : '—'}
                </span>
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-slate-400 hover:text-slate-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectIncident(incident);
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}