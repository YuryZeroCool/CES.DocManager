import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../styles/login.scss";
import { useDispatch, useSelector } from "react-redux";
import { IUserRequest, login, User } from "../../redux/actions/loginRedux";
import { useNavigate } from "react-router";
import { IAuthResponseType } from "../../redux/store/configureStore";
import { IAuthResponse } from "../../models/response/AuthResponse";

type Inputs = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const dispatch: IAuthResponseType = useDispatch();
  const counter = useSelector<User,User>((state) => state);

  //const state =  useSelector<User,User>(state=>state);
  // const [email,setEmail] = useState<string>('');
  // const [password,setPassword] = useState<string>('');
  let navigotor = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: "onBlur" });

  // useEffect(()=>{
  //   dispatch(login({email:" ",password:"ds"}));
  // },[dispatch]);
  // useEffect(() => {
  //   dispath(<IUser>({ username: "d", password: "s" }));
  // }, [dispath]);

  const onSubmit = async (user: IUserRequest) => {
    try {
      let res = await dispatch(login(user));
      if (res.type === "jwt/fulfilled") {
        let data = res.payload as unknown as IAuthResponse;
        navigotor("/");
        console.log(data.userName);
        console.log( counter);
      }
      if (res.type === "jwt/rejected") {
        
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-login">
      <div className="login-container">
        <h3>Добро пожаловать</h3>

        <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type={"email"}
              placeholder="Введите ваш email"
              className="input-email"
              {...register("email", { required: true })}
            />
          </Form.Group>
          <div style={{ height: 40 }}>{errors?.email && <p>Error!</p>}</div>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Пароль"
              className="input-password"
              {...register("password", { required: true })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicButtons">
            <Button variant="primary" type={"submit"}>
              Войти
            </Button>
            <Button variant="primary" type="submit">
              Забыли пароль?
            </Button>
          </Form.Group>
        </Form>
      </div>
    </section>
  );
};
