import { DashboardSidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ROLES } from '@/constants/roles';
import { userService } from '@/services/user.service';

export default async function DashboardLayout({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const userInfo = data.user;
  return (
    <SidebarProvider>
      <DashboardSidebar user={userInfo} />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {userInfo.role === ROLES.admin ? admin : user}
      </div>
    </SidebarProvider>
  );
}
