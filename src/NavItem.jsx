export const NavItem = ({ icon, className, children}) => {
  return (
    <a href="/" className={className}>
        {icon}
        <span className="ml-4 text-sm font-semibold">{children}</span>
    </a>)
}
