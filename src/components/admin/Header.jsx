const Header = ({ title = "Title", actions = [] }) => {
    return (
        <header className="p-3 bg-dark text-white shadow-sm rounded mb-4 sticky-top">
            <div className="d-flex align-items-center justify-content-between">
                <h4 className="mb-0">{title}</h4>
                <div className="d-flex gap-2">
                    {actions.map((action, index) => (
                        <button key={index} type="button" className={`btn ${action.variant || "btn-primary"}`} onClick={action.onClick}>
                            {action.icon && <i className={`fa fa-${action.icon}`} />}{" "} {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
};
  
export default Header;
  