# To-do

- [ ] Capturar erros e enviar erros para o client, que não seja `Internal Error`
  - [ ] User <-
  - [ ] Flight
  - [ ] Hotel
  - [ ] Package
  - [ ] ApiGateway

- [ ] Incluir simulador de pagamento
  
  ```typescript
    //incluir em todos models
    createAt: Date();
    updateAt: Date();

    enum StatusPayment {
      PENDENTE="PENDENTE",
      RECUSADO="RECUSADO",
      PAGO="PAGO",
    }

    type payment = {
      amount: number;
      status: StatusPayment;
      createAt: Date();
      updateAt: Date();
    }
  ```
- [] Injeção de dependecia: tsyring https://github.com/microsoft/tsyringe

- [] Docker - Subir cada serviço em uma mv
- 
- [] Teste unitários