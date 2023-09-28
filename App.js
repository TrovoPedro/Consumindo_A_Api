import React from 'react';
import "./App.css"

const formFields = [
  {
    "username": "username",
    label: "Nome",
    type: "text"
  },
  {
    "email": "email",
    label: 'Email',
    type: 'email'
  },
  {
    id: 'password',
    label: 'Senha',
    type: 'password',
  },
  
];

const App = () => {
  const [form, setForm] = React.useState(
    formFields.reduce((acc, field) => {
      return { ...acc, [field.id]: '' };
    }, {}),
  );

  const [response, setResponse] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    fetch('https://dev-apianimore.pantheonsite.io/json/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    }).then((response) => {
      setResponse(response);
    });
  }

  function handleChange({ target }) {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  }

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map(({ id, label, type }) => (
        <div key={id}>
          <label htmlFor={id}>{label}</label>
          <input type={type} id={id} value={form[id]} onChange={handleChange} />
        </div>
      ))}
      <button>Enviar</button>
      {response && response.ok && <p>Usuário Criado</p>}
    </form>
  );
};

export default App;