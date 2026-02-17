export const Footer = () => (
  <footer className="border-t border-border/30 bg-cream-dark/30 py-10 px-4">
    <div className="max-w-7xl mx-auto text-center">
      <p className="font-serif text-xl text-text-primary mb-2">
        Dominican-Inspired Cocktail Menu
      </p>
      <p className="text-sm text-text-muted mb-4">
        R&D collaboration &middot; Family roots: Samaná &amp; Tenares
      </p>
      <div className="flex items-center justify-center gap-1">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: `hsl(${30 + i * 8}, 70%, ${45 + i * 3}%)`, opacity: 0.4 }}
          />
        ))}
      </div>
    </div>
  </footer>
);
