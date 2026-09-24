import LoginForm from "../features/auth/components/LoginForm";

function LoginPage() {
  return (
    <div className="auth-page">
      <h1>Login to TicketFlow</h1>
      <LoginForm />

      <p className="demo-hint">
        Demo accounts (password:password123) : customer@ticketflow.dev &middot;
        agent@ticketflow.dev &middot; admin@ticketflow.dev
      </p>
    </div>
  );
}

export default LoginPage;
