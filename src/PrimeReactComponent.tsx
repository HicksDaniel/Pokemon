import { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { InputSwitch } from "primereact/inputswitch";
import { Slider } from "primereact/slider";
import { Rating } from "primereact/rating";
import { Chip } from "primereact/chip";

import { Tag } from "primereact/tag";
import { ProgressBar } from "primereact/progressbar";

import { Knob } from "primereact/knob";
import { Toast } from "primereact/toast";

import { useAuthStore } from "./store";

export default function PrimeReactComponent() {
  const { authorizeUser, isAuthenticated } = useAuthStore();

  // State management
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedThemeFamily, setSelectedThemeFamily] = useState("lara-blue");
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    password: "",
    bio: "Full-stack developer passionate about modern web technologies.",
    country: null,
    birthDate: null as Date | null,
    newsletter: true,
    theme: "dark",
    notifications: true,
  });

  const [preferences, setPreferences] = useState({
    volume: 75,
    brightness: 60,
    performance: 85,
    rating: 4,
  });

  const [progress, setProgress] = useState(42);
  const [selectedButtonStyles, setSelectedButtonStyles] = useState<string[]>([]);
  const toast = useRef<Toast>(null);

  const countries = [
    { name: "United States", code: "US", flag: "🇺🇸" },
    { name: "Canada", code: "CA", flag: "🇨🇦" },
    { name: "United Kingdom", code: "UK", flag: "🇬🇧" },
    { name: "Germany", code: "DE", flag: "🇩🇪" },
    { name: "France", code: "FR", flag: "🇫🇷" },
    { name: "Japan", code: "JP", flag: "🇯🇵" },
    { name: "Australia", code: "AU", flag: "🇦🇺" },
  ];

  const skills = [
    { name: "React", level: "Expert", color: "bg-blue-500" },
    { name: "TypeScript", level: "Advanced", color: "bg-indigo-500" },
    { name: "Node.js", level: "Intermediate", color: "bg-green-500" },
    { name: "Python", level: "Beginner", color: "bg-yellow-500" },
  ];

  const buttonStyles = [
    { name: "Default", value: "default", description: "Standard button" },
    { name: "Raised", value: "raised", description: "Elevated appearance" },
    { name: "Outlined", value: "outlined", description: "Border only" },
    { name: "Text", value: "text", description: "Text only, no background" },
    { name: "Link", value: "link", description: "Link appearance" },
    { name: "Rounded", value: "rounded", description: "Circular shape" },
  ];

  const themeFamily = [
    { name: "Lara-Blue", value: "lara-blue", description: "Modern blue theme" },
    {
      name: "Lara-Amber",
      value: "lara-amber",
      description: "Warm amber theme",
    },
    { name: "Lara-Cyan", value: "lara-cyan", description: "Cool cyan theme" },
    {
      name: "Lara-Green",
      value: "lara-green",
      description: "Natural green theme",
    },
    {
      name: "Lara-Indigo",
      value: "lara-indigo",
      description: "Deep indigo theme",
    },
    {
      name: "Lara-Pink",
      value: "lara-pink",
      description: "Vibrant pink theme",
    },
    {
      name: "Lara-Purple",
      value: "lara-purple",
      description: "Rich purple theme",
    },
    {
      name: "Lara-Teal",
      value: "lara-teal",
      description: "Elegant teal theme",
    },
  ];

  const showSuccess = (summary: string, detail: string) => {
    toast.current?.show({ severity: "success", summary, detail, life: 2000 });
  };

  const showInfo = (summary: string, detail: string) => {
    toast.current?.show({ severity: "info", summary, detail, life: 2000 });
  };

  const showWarn = (summary: string, detail: string) => {
    toast.current?.show({ severity: "warn", summary, detail, life: 2000 });
  };

  const showError = (summary: string, detail: string) => {
    toast.current?.show({ severity: "error", summary, detail, life: 2000 });
  };

  const showSecondary = (summary: string, detail: string) => {
    toast.current?.show({ severity: "secondary", summary, detail, life: 2000 });
  };

  const showContrast = (summary: string, detail: string) => {
    toast.current?.show({ severity: "contrast", summary, detail, life: 2000 });
  };

  const getButtonProps = (styles: string[]) => {
    const props: any = {};

    styles.forEach((style) => {
      switch (style) {
        case "raised":
          props.raised = true;
          break;
        case "outlined":
          props.outlined = true;
          break;
        case "text":
          props.text = true;
          break;
        case "link":
          props.link = true;
          break;
        case "rounded":
          props.rounded = true;
          break;
      }
    });

    return props;
  };

  const handleFormSubmit = () => {
    showSuccess("Profile Updated", "Your profile has been successfully updated!");
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          showInfo("Task Complete", "File upload completed successfully!");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  // Initialize theme on component mount
  useEffect(() => {
    const initializeTheme = () => {
      // Check if theme link already exists
      let themeLink = document.getElementById("theme-link") as HTMLLinkElement;

      if (!themeLink) {
        // Create initial theme link
        themeLink = document.createElement("link");
        themeLink.id = "theme-link";
        themeLink.rel = "stylesheet";
        themeLink.href = getThemeUrl(selectedThemeFamily, isDarkMode);
        document.head.appendChild(themeLink);
      }
    };

    initializeTheme();
  }, []);

  const getThemeUrl = (family: string, dark: boolean) => {
    const mode = dark ? "dark" : "light";
    return `/themes/${family.replace("-", `-${mode}-`)}/theme.css`;
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    updateTheme(selectedThemeFamily, newDarkMode);
  };

  const updateTheme = (family: string, dark: boolean) => {
    const themeLink = document.getElementById("theme-link") as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = getThemeUrl(family, dark);
    }

    showInfo("Theme Changed", `Applied ${family} ${dark ? "dark" : "light"} theme`);
  };

  return (
    <div className="h-screen flex justify-center p-4">
      <Toast ref={toast} />

      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-4 relative">
          {/* Theme Controls - Positioned absolutely in top right */}
          <div className="absolute top-0 right-0  flex items-center gap-2">
            <Dropdown
              value={selectedThemeFamily}
              onChange={(e) => {
                setSelectedThemeFamily(e.value);
                updateTheme(e.value, isDarkMode);
              }}
              options={themeFamily}
              optionLabel="name"
              optionValue="value"
              placeholder="Theme"
              className="w-50"
              tooltip="Select theme family"
              tooltipOptions={{ position: "left" }}
            />
            <Button
              icon={isDarkMode ? "pi pi-sun" : "pi pi-moon"}
              rounded
              text
              size="small"
              onClick={toggleTheme}
              tooltip={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
              tooltipOptions={{ position: "left" }}
            />
          </div>

          <h1 style={{ color: "var(--primary-color)" }} className="text-3xl font-bold mb-2">
            PrimeReact Component Gallery
          </h1>
          <p className="text-sm text-primary opacity-80  p-2 rounded">
            Explore PrimeReact components and their capabilities
          </p>
          <div className="flex justify-center gap-2">
            <Button
              label="Get Started"
              icon="pi pi-rocket"
              size="small"
              onClick={() => {
                if (isAuthenticated === false) {
                  authorizeUser();
                }
                showSuccess("Welcome!", "Explore the components below");
              }}
            />
            <Button
              label="Documentation"
              icon="pi pi-book"
              size="small"
              outlined
              onClick={() => window.open("https://primereact.org/", "_blank")}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 max-w-[1600px] grid grid-cols-3 gap-4 min-h-0">
          {/* User Profile Form Card */}
          <Card
            style={{ borderColor: "var(--primary-color)", borderWidth: "3px" }}
            className="h-full overflow-none col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <i className="pi pi-user text-xl text-blue-500"></i>
              <div>
                <h2 className="text-lg font-bold m-0">User Profile</h2>
                <p className="text-sm opacity-70 m-0">Interactive form components</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-bold mb-1">Full Name</label>
                <InputText
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                  size="small"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Email Address</label>
                <InputText
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full"
                  size="small"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Country</label>
                <Dropdown
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.value })}
                  options={countries}
                  optionLabel="name"
                  placeholder="Select country"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Birth Date</label>
                <Calendar
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.value || null })}
                  className="w-full"
                  placeholder="Select date"
                  showIcon
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.newsletter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newsletter: e.checked || false,
                      })
                    }
                  />
                  <label className="text-sm">Newsletter</label>
                </div>
                <InputSwitch
                  checked={formData.notifications}
                  onChange={(e) => setFormData({ ...formData, notifications: e.value })}
                />
              </div>

              <Button
                label="Update Profile"
                icon="pi pi-save"
                size="small"
                className="w-full"
                onClick={handleFormSubmit}
              />
            </div>
          </Card>

          {/* Interactive Controls Card */}

          <Card
            style={{ borderColor: "var(--primary-color)", borderWidth: "3px" }}
            className="h-full overflow-none"
          >
            <div className="flex items-center gap-2 mb-4">
              <i className="pi pi-sliders-h text-xl text-green-500"></i>
              <div>
                <h2 className="text-lg font-bold m-0">Interactive Controls</h2>
                <p className="text-sm opacity-70 m-0">Sliders, knobs & progress bars</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-bold mb-1">
                  Volume: {preferences.volume}%
                </label>
                <Slider
                  value={preferences.volume}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      volume: e.value as number,
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">
                  Brightness: {preferences.brightness}%
                </label>
                <Slider
                  value={preferences.brightness}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      brightness: e.value as number,
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="text-center">
                <label className="block text-sm font-bold mb-2">
                  Performance: {preferences.performance}
                </label>
                <div className="flex justify-center">
                  <Knob
                    value={preferences.performance}
                    onChange={(e) => setPreferences({ ...preferences, performance: e.value })}
                    size={80}
                    strokeWidth={6}
                    valueColor="#3b82f6"
                    rangeColor="#e2e8f0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Rating</label>
                <div className="flex justify-center">
                  <Rating
                    value={preferences.rating}
                    onChange={(e) => setPreferences({ ...preferences, rating: e.value || 0 })}
                    stars={5}
                    cancel={false}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-bold">Progress</label>
                  <span className="text-sm opacity-70">{Math.round(progress)}%</span>
                </div>
                <ProgressBar value={progress} className="mb-2" />
                <Button
                  label="Simulate"
                  icon="pi pi-upload"
                  size="small"
                  outlined
                  onClick={simulateProgress}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          {/* Buttons & Tags Card */}
          <Card
            style={{ borderColor: "var(--primary-color)", borderWidth: "3px" }}
            className="h-full overflow-none"
          >
            <div className="flex items-center gap-2 mb-2">
              <i className="pi pi-palette text-xl text-purple-500"></i>
              <div>
                <h2 className="text-lg font-bold m-0">Buttons & Tags</h2>
                <p className="text-sm opacity-70 m-0">Various styles & interactions</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <div>
                  <h3 className="text-sm font-bold mb-2">Button Variations</h3>

                  {/* Button Style Checkboxes */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold mb-2">Select Button Styles:</p>
                    <div className="flex flex-wrap gap-3">
                      {buttonStyles.map((style) => (
                        <div key={style.value} className="flex items-center gap-1">
                          <Checkbox
                            checked={selectedButtonStyles.includes(style.value)}
                            onChange={(e) => {
                              if (e.checked) {
                                setSelectedButtonStyles([...selectedButtonStyles, style.value]);
                              } else {
                                setSelectedButtonStyles(
                                  selectedButtonStyles.filter((s) => s !== style.value)
                                );
                              }
                            }}
                          />
                          <label className="text-xs cursor-pointer" title={style.description}>
                            {style.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button label="Primary" {...getButtonProps(selectedButtonStyles)} />
                    <Button
                      label="Success"
                      severity="success"
                      {...getButtonProps(selectedButtonStyles)}
                    />
                    <Button
                      label="Warning"
                      severity="warning"
                      {...getButtonProps(selectedButtonStyles)}
                    />
                    <Button
                      label="Danger"
                      severity="danger"
                      {...getButtonProps(selectedButtonStyles)}
                    />
                    <Button icon="pi pi-heart" {...getButtonProps(selectedButtonStyles)} />
                    <Button
                      icon="pi pi-star"
                      label="Favorite"
                      iconPos="right"
                      {...getButtonProps(selectedButtonStyles)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-3">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={`${skill.name} - ${skill.level}`}
                      className={`${skill.color} text-white`}
                      removable
                      onRemove={() => {
                        showInfo("Skill Removed", `${skill.name} removed from skills`);
                        return true;
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-3">Status Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Tag value="Active" severity="success" />
                  <Tag value="Pending" severity="warning" />
                  <Tag value="Inactive" severity="danger" />
                  <Tag value="Draft" severity="info" />
                  <Button label="Notifications" badge="5" />
                  <Button label="Messages" badge="12" severity="info" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold mb-2">Toast Demonstrations</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Button
                    label="Success"
                    severity="success"
                    size="small"
                    onClick={() => showSuccess("Success", "Operation completed successfully!")}
                  />
                  <Button
                    label="Info"
                    severity="info"
                    size="small"
                    onClick={() => showInfo("Info", "Here's some useful information")}
                  />
                  <Button
                    label="Warning"
                    severity="warning"
                    size="small"
                    onClick={() => showWarn("Warning", "Please check your input")}
                  />
                  <Button
                    label="Error"
                    severity="danger"
                    size="small"
                    onClick={() => showError("Error", "Something went wrong")}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    label="Secondary"
                    severity="secondary"
                    size="small"
                    onClick={() => showSecondary("Secondary", "Secondary message content")}
                  />
                  <Button
                    label="Contrast"
                    severity="contrast"
                    size="small"
                    onClick={() => showContrast("Contrast", "High contrast message")}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
