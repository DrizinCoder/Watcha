interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary'; // Define os valores exatos permitidos
}

export const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
  const styles = {
    primary: "bg-red-600 hover:bg-red-700 text-white",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
  }
  
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors font-medium ${styles[(variant)]}`}
    >
      {children}
    </button>
  )
}