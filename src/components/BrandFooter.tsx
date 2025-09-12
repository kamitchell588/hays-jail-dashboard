export default function BrandFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-600">
          © {currentYear} Hays County, Texas • Demo build for RFP
        </div>
      </div>
    </footer>
  );
}