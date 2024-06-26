import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../context/Provider";
import Loading from "../Loading/Loading";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

// Função para exibir notificações de sucesso e erro
const notify = (message, type) => {
  const options = {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  if (type === 'success') {
    toast.success(message, options);
  } else {
    toast.error(message, options);
  }
};

// Função para formatar número de telefone
const handlePhoneChange = (e) => {
  const phone = e.target.value.replace(/\D/g, '');
  if (phone.length > 12) {
    e.target.value = phone.slice(0, 11);
  }
};

// Função para buscar endereço pelo CEP
const handleCepChange = async (e, setAddress, notify) => {
  const cep = e.target.value.replace(/\D/g, '');
  if (cep.length > 8) {
    e.target.value = cep.slice(0, 8);
    return;
  }
  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        notify('Cep inválido!', 'error');
        setAddress("");
      } else {
        setAddress(data.logradouro, data.uf);
      }
    } catch (error) {
      notify('Cep inválido!', 'error');
      setAddress("");
    }
  } else {
    setAddress("");
  }
};

const InputField = ({ register, name, placeholder, type, errors, validation, onChange }) => (
  <>
    <input
      type={type}
      {...register(name, validation)}
      placeholder={placeholder}
      className="bg-white-100 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
      onChange={onChange}
    />
    {errors[name] && <span className="text-red-600">{errors[name].message}</span>}
  </>
);

export const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [address, setAddress] = useState("");
  const { cartItems, setCartItems , loading, setLoading, isOpen, } = useContext(Context);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!isOpen) {
      notify('Ops! O restaurante está fechado', 'error');
      return;
    }

    if (cartItems.length === 0) {
      notify("Carrinho está vazio!", 'error');
      return;
    }

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.qualify), 0);
    const pedidoData = {
      name: data.name,
      message: data.message,
      home: data.home,
      address: address,
      total: total,
      cart: cartItems,
      number: data.phone
    };

    try {
      setLoading(true);
      const response = await fetch('https://twilio-api-ten.vercel.app/enviar-pedido-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });

      if (response.ok) {
        notify('Pedido enviado!', 'success');
        reset();
        setCartItems([]); // Limpa o carrinho de compras
        navigate('/'); // Redireciona para a página inicial
      } else {
        notify('Erro ao enviar pedido', 'error');
      }
    } catch (error) {
      notify('Ops algo não deu certo!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (<Loading />) : (
        <div className="w-full">
          <div className="bg-white w-full text-red-600 py-2 px-2 text-4xl">
            <Link to={'/'}>
              <CiLogout />
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 mt-5 mb-1 px-4">
            <h1 className="text-center text-3xl font-bold">Enviar seu <span className="text-red-600">pedido</span></h1>
            <InputField
              register={register}
              name="name"
              placeholder="Nome"
              type="text"
              errors={errors}
              validation={{ required: "O nome não pode estar vazio" }}
            />
            <InputField
              register={register}
              name="phone"
              placeholder="Telefone"
              type="number"
              errors={errors}
              validation={{ required: "O número é inválido!", pattern: /^[0-9]{11}$/ }}
              onChange={handlePhoneChange}
            />
            <InputField
              register={register}
              name="email"
              placeholder="Email"
              type="email"
              errors={errors}
              validation={{ required: "Email inválido!" }}
            />
            <InputField
              register={register}
              name="cep"
              placeholder="Cep"
              type="number"
              errors={errors}
              validation={{ required: "Cep inválido", pattern: /^[0-9]{8}$/ }}
              onChange={(e) => handleCepChange(e, setAddress, notify)}
            />
            <input
              type="text"
              value={address}
              placeholder="Endereço"
              className="bg-white-200 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
              readOnly
            />
            <InputField
              register={register}
              name="home"
              placeholder="Casa/Apartamento"
              type="text"
              errors={errors}
              validation={{ required: "Este campo é obrigatório" }}
            />
            <textarea
              {...register("message")}
              placeholder="Mensagem (opcional)"
              className="bg-white-100 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
            />
            <button className="border py-3 bg-green-500 text-white font-bold text-2xl">Fazer pedido</button>
          </form>
        </div>
      )}
    </>
  );
};
