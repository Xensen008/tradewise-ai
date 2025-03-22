import { Calculator, Calendar, Home,  MessageCircle, Search, } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/lib/hooks/use-auth"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Stock Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Portfolio",
    url: "portfolio",
    icon: Calendar,
  },
  {
    title: "AI Advisory",
    url: "advisory",
    icon: MessageCircle,
  },
  {
    title: "Tax Calculator",
    url: "tax-calculator",
    icon: Calculator,
  },
]

export function AppSidebar() {

    const {user, isLoading} = useAuth()
    console.log(user)
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <h1 className="font-bold text-2xl text-center">TradeWiise AI</h1>
 
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Add profile footer */}
        <div className="mt-auto border-t">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 relative rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="/path-to-avatar-image.jpg" 
                alt="Profile"
                fill
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Kalu</span>
              <span className="text-sm text-gray-600">aryan@tech.com</span>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
