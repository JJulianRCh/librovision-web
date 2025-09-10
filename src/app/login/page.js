export default function LoginPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify center text-center">
            <section>
                <h1>Inicio de sesión</h1>
                <form>
                    <input className="input" name="email" type="email" placeholder="Email" required/>
                    <br/>
                    <input className="input" name="pwd" type="password" placeholder="Contraseña" required/>
                    <br/>
                    <button className="btn btn-azul" type="submit">Entrar</button>
                </form>
            </section>
        </main>
    );
}
