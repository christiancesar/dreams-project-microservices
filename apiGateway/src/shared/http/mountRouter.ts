import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { FASTIFY_INSTANCE } from "./tokens";

export interface HttpRouter {
  register(): void;
}

type HttpRouterConstructor = new (...args: any[]) => HttpRouter;

// Cada rota roda num container filho, com o FastifyInstance do próprio escopo.
export function mountRouter(parent: FastifyInstance, Router: HttpRouterConstructor, prefix?: string) {
  parent.register(async (instance) => {
    const scoped = container.createChildContainer();
    scoped.registerInstance<FastifyInstance>(FASTIFY_INSTANCE, instance);
    scoped.resolve(Router).register();
  }, prefix ? { prefix } : {});
}
