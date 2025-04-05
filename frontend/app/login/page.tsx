import LoginWidget from "@/auth/LoginWidget";
import oktaConfig from "@/lib/oktaConfig";

const Login = () => {
    return ( 
        <div>
            <LoginWidget config={oktaConfig.widget} />
        </div>
     );
}
 
export default Login;