import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const campaigns = [
  { name: "Just Herbs", status: "Active" },
  { name: "Juicy chemistry", status: "Active" },
  { name: "Hyugalife 2", status: "Active" },
  { name: "Honeyveda", status: "Active" },
  { name: "HempStreet", status: "Active" },
  { name: "HealthyHey 2", status: "Active" },
];

const linkedinAccounts = [
  { name: "Pulkit Garg", email: "1999pulkitgarg@gmail.com", status: "Connected", progress: 17, total: 30 },
  { name: "Jivesh Lakhani", email: "jivesh@gmail.com", status: "Connected", progress: 19, total: 30 },
  { name: "Indrajit Sahani", email: "indrajit38mig@gmail.com", status: "Connected", progress: 18, total: 30 },
  { name: "Bhavya Arora", email: "bhavyaarora199.ba@gmail.com", status: "Connected", progress: 18, total: 100 },
];

const activities = [
  { lead: "Om Satyarthy", campaign: "Gynoveda", status: "Pending Approval" },
  { lead: "Dr. Bhuvaneshwari", campaign: "Gynoveda", status: "Sent 7 mins ago" },
  { lead: "Surdeep Singh", campaign: "Gynoveda", status: "Sent 7 mins ago" },
  { lead: "Dilbag Singh", campaign: "Gynoveda", status: "Sent 7 mins ago" },
  { lead: "Vanshy Jain", campaign: "Gynoveda", status: "Sent 7 mins ago" },
  { lead: "Sunil Pal", campaign: "Digi Sidekick", status: "Pending Approval" },
  { lead: "Utkarsh K.", campaign: "The Skin Story", status: "Do Not Contact" },
  { lead: "Shreya Ramakrishna", campaign: "Pokonut", status: "Followup 10 mins ago" },
  { lead: "Deepak Kumar", campaign: "Recruit", status: "Followup 10 mins ago" },
];

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column (Campaigns + LinkedIn Accounts) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Campaigns */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Campaigns</CardTitle>
            <select className="border rounded px-2 py-1 text-sm">
              <option>All Campaigns</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {campaigns.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between border rounded-lg px-4 py-2"
                >
                  <span>{c.name}</span>
                  <Badge variant="success">{c.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* LinkedIn Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>LinkedIn Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {linkedinAccounts.map((acc) => (
                <div key={acc.email} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{acc.name}</p>
                    <p className="text-xs text-gray-500">{acc.email}</p>
                  </div>
                  <div className="w-48">
                    <Badge className="mb-1">{acc.status}</Badge>
                    <Progress value={(acc.progress / acc.total) * 100} />
                    <p className="text-xs text-gray-500 mt-1">
                      {acc.progress}/{acc.total}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column (Recent Activity) */}
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Recent Activity</CardTitle>
          <select className="border rounded px-2 py-1 text-sm">
            <option>Most Recent</option>
          </select>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities.map((a, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{a.lead}</p>
                  <p className="text-xs text-gray-500">{a.campaign}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {a.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
