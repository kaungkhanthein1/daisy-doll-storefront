import { Bell } from "lucide-react";
import appLogo from "@/assets/appLogo.png";

export default function TopAppBar() {
  return (
    <div
      className="mx-auto w-full"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 8px)",
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 16,
        maxWidth: 1200,
      }}
    >
      <div className="flex items-center justify-between">
        <img
          src={appLogo}
          alt="Daisy Doll"
          style={{ width: 52, height: 52 }}
        />
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center"
          style={{
            borderRadius: "50%",
            backgroundColor: "#fdf2f8",
          }}
          aria-label="Notifications"
        >
          <Bell size={20} color="#d63384" />
        </button>
      </div>
    </div>
  );
}
