import { LoaderIcon } from "lucide-react";
import { useTheme } from "../store/useTheme";

const PageLoader = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen flex items-center justify-center" data-theme={theme}>
      <LoaderIcon className="animate-spin size-10 text-primary" />
    </div>
  );
};
export default PageLoader;