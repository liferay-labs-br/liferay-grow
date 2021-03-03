export interface MiddlewareBaseResolver {
  create?: Array<() => void>;
  update?: Array<() => void>;
  delete?: Array<() => void>;
}
