# API AUTENTICAÇÃO E AUTORIZAÇÃO

Uma API desenvolvida para praticar conceitos de autenticação e autorização

Rode o comando abaixo para executar a migração do banco de dados:

```bash
npm run migrate dev
```

**Será essencial ter um banco de dados criado e referenciado nas variáveis de ambiente**

Rode o comando abaixo para iniciar a aplicação em modo de desenvolvimento

```bash
npm run dev
```

## Rotas da aplicação

### Registrar usuário /users POST

Padrão de corpo

```json
{
  "name": "joao",
  "email": "joao@hotmail.com",
  "password": "olamundo"
}
```

Padrão de resposta (STATUS 201)

```json
{
  "id": 2,
  "name": "joao",
  "email": "joao@hotmail.com"
}
```

### Login de usuario /users/login POST

Padrão de corpo

```json
{
  "email": "ryan@hotmail.com",
  "password": "olamundo"
}
```

Padrão de resposta (STATUS 200)

```json
{
  "acessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE1Nzk2ODA1LCJleHAiOjE3MTkzOTY4MDV9.fWMHJd24HzT6b_iRI4B96YuNuAlZSqgHlOiIBJednYg",
  "data": {
    "id": 3,
    "name": "Ryan",
    "email": "ryan@hotmail.com"
  }
}
```

### Possíveis erros

#### 404 NOT FOUND - Usuário não cadastrado

```json
{
	"message": "User not registered"
}
```

#### 403 FORBIDDEN - Email e senha não correspondem

```json
{
	"message": "Email and Password doesn't match."
}
```

### Recuperar usuário GET /users (É necessário autorização)

#### AUTORIZAÇÃO

```json
{
    "headers": {
        "authorization": "Bearer Token"
    }
}
```

Padrão de resposta (STATUS 200)

```json
{
	"id": 3,
	"name": "Ryan",
	"email": "ryan@hotmail.com"
}
```

### Possíveis erros

#### 401 UNAUTHORIZED 