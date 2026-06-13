const EmptyState = ({ title = "No items", message = "Nothing to show here." }) => {
  return (
    <div className="empty-state">
      <img src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800" alt="empty" />
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
