import { MongoAbility } from "@casl/ability";
import { CanActivate } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CaslAbilityFactory } from "../casl-ability.factory/casl-ability.factory";
import { PolicyHandler } from "../dto/policy.handler";
import { CHECK_POLICIES_KEY } from "./policy.decorator";

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability =  await this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: MongoAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
