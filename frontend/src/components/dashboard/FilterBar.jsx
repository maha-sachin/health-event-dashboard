import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from 'lucide-react';

export default function FilterBar({ filters, onFilterChange, services = [], regions = [] }) {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value === 'all' ? '' : value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      category: '',
      actionability: '',
      environment: '',
      service: '',
      region: '',
      status: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(v => v && v !== '');

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-800 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Filter className="h-4 w-4" />
          <span>Q Search and add filter</span>
        </div>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-slate-400 hover:text-slate-100 h-8"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {/* Search */}
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Search event, service, region, ARN..."
            className="pl-9 bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-400"
          />
        </div>

        {/* Actionability */}
        <Select value={filters.actionability || 'all'} onValueChange={(v) => handleChange('actionability', v)}>
          <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-300">
            <SelectValue placeholder="Actionability" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all" className="text-slate-200 focus:bg-slate-700 focus:text-white">All Actionability</SelectItem>
            <SelectItem value="ACTION_REQUIRED" className="text-slate-200 focus:bg-slate-700 focus:text-white">Action Required</SelectItem>
            <SelectItem value="ACTION_MAY_BE_REQUIRED" className="text-slate-200 focus:bg-slate-700 focus:text-white">Action May Be Required</SelectItem>
            <SelectItem value="INFORMATIONAL" className="text-slate-200 focus:bg-slate-700 focus:text-white">Informational</SelectItem>
          </SelectContent>
        </Select>

        {/* Event Category */}
        <Select value={filters.category || 'all'} onValueChange={(v) => handleChange('category', v)}>
          <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-300">
            <SelectValue placeholder="Event category" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all" className="text-slate-200 focus:bg-slate-700 focus:text-white">All Categories</SelectItem>
            <SelectItem value="issue" className="text-slate-200 focus:bg-slate-700 focus:text-white">Issue</SelectItem>
            <SelectItem value="scheduledChange" className="text-slate-200 focus:bg-slate-700 focus:text-white">Scheduled change</SelectItem>
            <SelectItem value="accountNotification" className="text-slate-200 focus:bg-slate-700 focus:text-white">Notification</SelectItem>
          </SelectContent>
        </Select>

        {/* Service */}
        <Select value={filters.service || 'all'} onValueChange={(v) => handleChange('service', v)}>
          <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-300">
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all" className="text-slate-200 focus:bg-slate-700 focus:text-white">All Services</SelectItem>
            {services.map(svc => (
              <SelectItem key={svc} value={svc} className="text-slate-200 focus:bg-slate-700 focus:text-white">{svc}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Region */}
        <Select value={filters.region || 'all'} onValueChange={(v) => handleChange('region', v)}>
          <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-300">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all" className="text-slate-200 focus:bg-slate-700 focus:text-white">All Regions</SelectItem>
            {regions.map(r => (
              <SelectItem key={r} value={r} className="text-slate-200 focus:bg-slate-700 focus:text-white">{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Environment */}
        <Select value={filters.environment || 'all'} onValueChange={(v) => handleChange('environment', v)}>
          <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-300">
            <SelectValue placeholder="Environment" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all" className="text-slate-200 focus:bg-slate-700 focus:text-white">All Environments</SelectItem>
            <SelectItem value="PRD" className="text-slate-200 focus:bg-slate-700 focus:text-white">Production</SelectItem>
            <SelectItem value="NPR" className="text-slate-200 focus:bg-slate-700 focus:text-white">Non-Prod</SelectItem>
            <SelectItem value="DEV" className="text-slate-200 focus:bg-slate-700 focus:text-white">Development</SelectItem>
            <SelectItem value="SANDBOX" className="text-slate-200 focus:bg-slate-700 focus:text-white">Sandbox</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}