import products from "../data/products";
import Image from "next/image";
import Link from "next/link";

export default function Products() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">جميع المنتجات</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-2xl shadow-lg p-4 hover:shadow-2xl transition"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="rounded-xl w-full object-cover"
            />
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
            <Link
              href={`/product/${product.id}`}
              className="text-blue-600 underline mt-2 inline-block"
            >
              تفاصيل المنتج
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}