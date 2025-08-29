const CartPage = () => {
  return (
    <div className="w-full">
      <div className="w-full h-[200px] flex justify-center items-center bg-gradient-to-r from-indigo-100 via-white to-indigo-100">
        <h1 className="text-4xl font-medium">Shopping Cart</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
          </div>
          
          <div className="lg:col-span-4 bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CartPage;
