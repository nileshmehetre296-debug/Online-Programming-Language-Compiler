import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { langItems } from "@/constant";
import { cn } from "@/lib/utils";
import { NavLink, useSearchParams } from "react-router-dom";

export function AppSidebar() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "nodejs";

  return (
    <Sidebar className="md:hidden">
      <SidebarContent>
        <SidebarGroup className="p-6">
          <SidebarGroupLabel>
            <img
              className="hidden dark:block"
              src="https://cdn.playground-v2.programiz.com/assets/logos/logo-inverted.svg"
            />
            <img
              className="dark:hidden"
              src="https://cdn.playground-v2.programiz.com/assets/logos/logo.svg"
            />
          </SidebarGroupLabel>
          <SidebarGroupContent className="pt-[40px]">
            <SidebarMenu>
              {langItems.map((item) => (
                <SidebarMenuItem key={item.title} className="pb-4">
                  <SidebarMenuButton
                    asChild
                    className="h-full p-0 rounded-none"
                  >
                    <NavLink to={`?lang=${item.lang}`}>
                      <div
                        className={cn("border p-2", {
                          "bg-[#0556f3]": lang == item.lang,
                        })}
                      >
                        <item.icon className="text-[#25265e66] dark:text-white h-5 w-5" />
                      </div>
                      <span className="text-foreground font-medium text-xs">
                        {item.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
