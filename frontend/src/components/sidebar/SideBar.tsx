"use client";

import { Home, Package, Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

export function SidebarSimplified() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/home", icon: Home },
    { name: "Products", href: "/products", icon: Package },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? "" : <Menu className="h-5 w-5" />}
      </Button>

      <aside
        className={cn(
          "h-screen bg-background border-r transition-all duration-300 fixed z-40",
          "md:relative",
          isMobile
            ? isOpen
              ? "left-0 w-64"
              : "-left-64 w-64"
            : isCollapsed
            ? "w-20"
            : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 font-semibold whitespace-nowrap",
                isCollapsed && "hidden"
              )}
            >
              <Package className="h-6 w-6" />
              <span>ProductHub</span>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex h-8 w-8"
              onClick={toggleCollapse}
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  isCollapsed && "rotate-180"
                )}
              />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8"
              onClick={toggleSidebar}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto p-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md p-3 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent hover:text-accent-foreground text-muted-foreground",
                  isCollapsed && "justify-center"
                )}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>

          <div className="p-4">
            <Separator className="my-2" />
            <div
              className={cn(
                "rounded-md p-3 text-sm flex items-center gap-2",
                isCollapsed ? "justify-center" : "justify-between"
              )}
            >
              {!isCollapsed && (
                <div>
                  <p className="text-muted-foreground">Gabriel</p>
                  <p className="font-medium">Porto</p>
                </div>
              )}
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">GP</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
