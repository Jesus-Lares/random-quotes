import { typesObjectString } from "@utils/constants";

const userMessages: typesObjectString = {
  EMAIL_EXIST: "El email ya esta regitrado con una cuenta.",
  GET_ALL: "Lista de usuarios cargada correctamente",
  GET: "Usuario cargado correctamente.",
  DATA_EMPTY: "No se recibieron datos para el registro.",
  CREATE_SUCCESS: "Usuario creado correctamente.",
  EMAIL_NOT_EXIST: "El usuario no existe.",
  WRONG_PASSWORD: "Contraseña incorrecta.",
  TOKEN_VERICATION_FAILED: "token no valido, inicia sesion de nuevo",
  DELETE_SUCCESS: "Usuario eliminado.",
  UPDATE_SUCCESS: "Usuario actulizado.",
  ALL_USERS:
    "Error al cargar los usuarios. Comprueba que tienes todo corretamente.",
  ERROR_DEFAULT:
    "Error al realizar la petición. Comprueba que tienes corretamente todo",
};

export default userMessages;
