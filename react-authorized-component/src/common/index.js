export function checkAuth(actionName) {
  //const { authorizationData } = store.getState().authReducer;
  /*return (
    authorizationData.findIndex(
      action => action.name === actionName && action.authorized
    ) !== -1
  );*/
  return actionName === "authorizedActionSample";
}
