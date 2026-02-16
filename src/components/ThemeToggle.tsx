//import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const onColorChange = (e: any) => {
    console.log(theme);
    toggleTheme(e.target.value);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      //onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37]/20 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {/* <Sun
        className={`w-5 h-5 text-[#D4AF37] transition-all duration-300 ${
          theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
      <Moon
        className={`absolute w-5 h-5 text-[#D4AF37] transition-all duration-300 ${
          theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
      /> */}
      <input 
        type="color" 
        className="p-1 h-10 w-14 block bg-layer border border-layer-line cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none" 
        id="hs-color-input" 
        value="hsl(240, 5, 10)" 
        title="Choose your color"
        onChange={e => onColorChange(e)}
      >
      </input>
    </Button>
  );
};

export default ThemeToggle;
