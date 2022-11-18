import { PageMetaDto } from '../dtos/pagination/page-meta.dto';
import { PageOptionsDto } from '../dtos/pagination/page-options.dto';
import { PageDto } from '../dtos/pagination/page.dto';

type PaginateCriteria = {
  where: any;
  skip: number;
  take: number;
  orderBy: any;
  include?: any;
  exclude?: string[];
};

// Exclude keys from model
export function exclude<Model, Key extends keyof Model>(
  model: Model,
  keys: Key[],
): Omit<Model, Key> {
  for (let key of keys) {
    delete model[key];
  }
  return model;
}

export const paginate = async <Model, FindParams>(
  model: any,
  criteria: FindParams,
  pageOptionsDto: PageOptionsDto,
) => {
  // CRUD operations
  let entities = await (model as any).findMany(criteria);
  delete criteria["select"];
  
  const itemCount = await (model as any).count(criteria);

  const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

  return new PageDto<Model>(entities, pageMetaDto);
};
