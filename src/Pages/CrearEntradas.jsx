import Joi from "joi";
import { useToast } from "../../Hooks/useToast";
import { servicioCrearEntrada } from "../Api/servicioCrearEntrada";
import { Forms } from "../Components/Forms";
import { Input } from "../Components/Input";
import { InputSelect } from "../Components/InputSelect";
import { InputTextArea } from "../Components/InputTextArea";
import "../Styles/entradas.css";
import { InputMultiFotos } from "../Components/inputMultiFotos";
import { Toast } from "../Components/Toast";

const schema = Joi.object({
  titulo: Joi.string().max(150).required(),
  categoria: Joi.string().required(),
  lugar: Joi.string().max(100).required(),
  texto: Joi.string().max(150).required(),
  foto: Joi.array().min(1).max(5).required(),
});

export function CrearEntrada() {
  const { toastData, showToast } = useToast();


  const onSubmit = async (formValue) => {
    showToast(0, "", "");

    const resultado = await servicioCrearEntrada(formValue);

    if (resultado.status == "ok") {
      showToast(3000, "exito", resultado.message);
    } else {
      showToast(3000, "error", resultado.message);
    }
  };

  return (
    <main className="main-entradas">
      <h1>Crear Entrada</h1>
      <Forms clase={"form-entradas"} onSubmit={onSubmit} schema={schema}>
        <div className="div-entradas">
          <Input
            name={"titulo"}
            clase={"input"}
            type={"text"}
            label={"Titulo:"}
            autocomplete={"off"}
          />
          <InputSelect clase={"select"} label={"Categoria:"} name={"categoria"} />
          <Input
            name={"lugar"}
            clase={"input"}
            type={"text"}
            label={"Lugar:"}
            autocomplete={"off"}
          />
          <InputTextArea
            label={"Descripción:"}
            clase={"text-area"}
            maxChars={"150"}
            name={"texto"}
          />
        </div>
        <div className="div-fotos">
          <InputMultiFotos label={"Fotos Del Viaje"} name={"foto"} />
        </div>
      </Forms>
      <Toast  toastData={toastData}/>
    </main>
  );
}
