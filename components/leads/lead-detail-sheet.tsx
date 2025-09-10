"use client";

import React, { useState } from 'react';
import { Lead } from '@/types/lead';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Clock, 
  CheckCircle2,
  MessageSquare,
  UserPlus,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Activity,
  FileText,
  Send,
  MoreVertical,
  X,
  User,
  Briefcase
} from "lucide-react";

type Props = {
  lead: Lead | null;
  onClose: () => void;
};

// Timeline item component
const TimelineItem = ({ 
  type, 
  title, 
  message, 
  time, 
  status,
  action 
}: { 
  type: string; 
  title: string; 
  message: string; 
  time: string;
  status?: 'completed' | 'pending' | 'active';
  action?: React.ReactNode;
}) => {
  const getIcon = () => {
    switch(type) {
      case 'invitation':
        return <UserPlus className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'followup':
        return <Send className="h-4 w-4" />;
      case 'replied':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`p-2 rounded-full ${status === 'completed' ? 'bg-green-100 text-green-600' : status === 'active' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
          {getIcon()}
        </div>
        {status !== 'completed' && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-sm text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600 mt-1">{message}</p>
            {action && <div className="mt-2">{action}</div>}
          </div>
          <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default function LeadDetailSheet({ lead, onClose }: Props) {
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    timeline: true,
    notes: false
  });

  if (!lead) return null;

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusBadge = () => {
    switch(lead.status) {
      case 'Converted':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Converted</Badge>;
      case 'Responded':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Responded</Badge>;
      case 'Contacted':
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Contacted</Badge>;
      case 'Followup':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Follow-up</Badge>;
      case 'Pending Approval':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Pending Approval</Badge>;
      case 'Sent':
        return <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-100">Sent</Badge>;
      case 'Do Not Contact':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Do Not Contact</Badge>;
      case 'Pending':
      default:
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Pending</Badge>;
    }
  };

  return (
    <Sheet open={!!lead} onOpenChange={onClose}>
      <SheetContent side="right" className="sm:max-w-lg p-0 overflow-hidden">
        {/* Add SheetHeader with SheetTitle for accessibility */}
        <SheetHeader className="sr-only">
          <SheetTitle>Lead Profile for {lead.name}</SheetTitle>
        </SheetHeader>

        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-semibold text-gray-900">Lead Profile</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[calc(100vh-140px)]">
          {/* Lead Info Header */}
          <div className="px-6 py-4 bg-white border-b">
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{lead.name}</h3>
                {lead.title && (
                  <p className="text-sm text-gray-600 mt-1">{lead.title}</p>
                )}
                {lead.company && (
                  <div className="flex items-center gap-2 mt-2">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{lead.company}</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {getStatusBadge()}
                {lead.timestamp && (
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {lead.timestamp}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Additional Profile Info Section */}
          <div className="px-6 py-4 bg-white border-b">
            <button
              onClick={() => toggleSection('profile')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-semibold text-gray-700">Additional Profile Info</h4>
              {expandedSections.profile ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </button>
            
            {expandedSections.profile && (
              <div className="mt-4 space-y-3">
                {lead.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{lead.email}</span>
                  </div>
                )}
                {lead.company && (
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{lead.company}</span>
                  </div>
                )}
                {lead.campaign && (
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Campaign: {lead.campaign}</span>
                  </div>
                )}
                {lead.campaignName && lead.campaignName !== lead.campaign && (
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Campaign Name: {lead.campaignName}</span>
                  </div>
                )}
                {lead.lastContact && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Last Contact: {lead.lastContact}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="px-6 py-4 bg-white">
            <button
              onClick={() => toggleSection('timeline')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-semibold text-gray-700">Activity Timeline</h4>
              {expandedSections.timeline ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </button>
            
            {expandedSections.timeline && (
              <div className="mt-4">
                {/* Display interactions from lead data */}
                {lead.interactions && lead.interactions.length > 0 ? (
                  lead.interactions.map((interaction, index) => (
                    <TimelineItem
                      key={index}
                      type="message"
                      title={`Interaction ${index + 1}`}
                      message={interaction}
                      time={lead.timestamp || 'Recently'}
                      status={index === 0 ? 'active' : 'completed'}
                    />
                  ))
                ) : (
                  <>
                    <TimelineItem
                      type="invitation"
                      title="Initial Contact"
                      message="Lead added to campaign"
                      time={lead.timestamp || 'Recently'}
                      status="completed"
                    />
                    {lead.status === 'Contacted' && (
                      <TimelineItem
                        type="message"
                        title="Contact Made"
                        message="Outreach message sent"
                        time={lead.lastContact || 'Recently'}
                        status="completed"
                      />
                    )}
                    {lead.status === 'Followup' && (
                      <TimelineItem
                        type="followup"
                        title="Follow-up Required"
                        message="Scheduled for follow-up"
                        time="Pending"
                        status="pending"
                      />
                    )}
                    {lead.status === 'Responded' && (
                      <TimelineItem
                        type="replied"
                        title="Response Received"
                        message="Lead has responded"
                        time={lead.lastContact || 'Recently'}
                        status="completed"
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Notes Section */}
          <div className="px-6 py-4 bg-white border-t">
            <button
              onClick={() => toggleSection('notes')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="text-sm font-semibold text-gray-700">Notes</h4>
              {expandedSections.notes ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </button>
            
            {expandedSections.notes && (
              <div className="mt-4">
                <textarea
                  className="w-full p-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Add notes about this lead..."
                  defaultValue=""
                />
                <Button size="sm" className="mt-2">
                  Save Note
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t px-6 py-3">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button variant="default" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Update Status
            </Button>
            <Button variant="default" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Contact
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}