export default function RegisterPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify center text-center">
            <section>
                <h1>Creacion de cuenta</h1>
                <form>
                    <input className="input" name="username" placeholder="Nombre de usuario" required/>
                    <br/>
                    <input className="input" name="email" type="email" placeholder="Email" required/>
                    <br/>
                    <input className="input" name="pwd" type="password" placeholder="Contraseña" required/>
                    <br/>
                    <button className="btn btn-verde">Crear cuenta</button>
                </form>
            </section>
        </main>
    );
}
