import { MongoAbility } from '@casl/ability';

interface IPolicyHandler {
  handle(ability: MongoAbility): boolean;
}

type PolicyHandlerCallback = (ability: MongoAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

// export class ReadArticlePolicyHandler implements IPolicyHandler {
//   handle(ability: AppAbility) {
//     return ability.can(Action.Read, Article);
//   }
// }
