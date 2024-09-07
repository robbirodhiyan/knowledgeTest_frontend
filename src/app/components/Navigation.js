import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="w-full bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
