interface CardProps {
    children: React.ReactNode;
    className?: string;
  }
  
  const Card = ({ children, className }: CardProps) => {
    return (
      <div className={`p-4 rounded-lg shadow-lg bg-white ${className}`}>
        {children}
      </div>
    );
  };
  
  export default Card;