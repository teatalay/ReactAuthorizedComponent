import React from "react";
import { checkAuth } from "../../common";
const defaultUnauthorizedProps = { visible: false };

export default ({
  component: WrappedComponent,
  actionName: actionNameFromWrapper,
  unAuthorizedProps: unAuthorizedPropsFromWrapper = defaultUnauthorizedProps,
  unAuthorizedAction: unAuthorizedActionFromWrapper,
  unAuthorizedRender: unAuthorizedRenderFromWrapper,
  blockRender: blockRenderFromProps
}) => ({
  actionName = actionNameFromWrapper,
  unAuthorizedProps = unAuthorizedPropsFromWrapper,
  unAuthorizedAction = unAuthorizedActionFromWrapper,
  unAuthorizedRender = unAuthorizedRenderFromWrapper,
  blockRender = blockRenderFromProps,
  ...props
}) => {
  const isAuthorized = checkAuth(actionName);
  if (!isAuthorized) {
    unAuthorizeAction(unAuthorizedAction);
    if (blockRender || unAuthorizedRender) return unAuthorizedRender || null;
    if (unAuthorizedProps === defaultUnauthorizedProps) return null;
  }
  return (
    <WrappedComponent {...props} {...(isAuthorized ? {} : unAuthorizedProps)} />
  );
};

function unAuthorizeAction(action) {
  if (action && action instanceof Function) action();
}
