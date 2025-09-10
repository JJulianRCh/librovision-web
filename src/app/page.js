import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify center bg-grey-50 text-center">
      <section className="p-10">
        <h1 className="text-4x1 font-bold mb-4">Libro Vision</h1>
        <p className="texto-std">Descubre y comparte tus libros favoritos con esta comunidad</p>
        <div className="space-x-4">
          <Link className="btn btn-azul" href="/login">Iniciar Sesion</Link>
          <br></br>
          <br></br>
          <p>Si no tienes cuenta, unete a esta comunidad</p>
          <Link className="btn btn-azul" href="/register">Registrarse</Link>
        </div>
      </section>
    </main>
  );
}
