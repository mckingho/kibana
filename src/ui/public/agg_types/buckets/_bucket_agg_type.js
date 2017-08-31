import _ from 'lodash';
import { AggTypesAggTypeProvider } from 'ui/agg_types/agg_type';
import nestedAndChildTemplate from 'ui/agg_types/controls/nested_and_child.html';

export function AggTypesBucketsBucketAggTypeProvider(Private) {
  const AggType = Private(AggTypesAggTypeProvider);

  _.class(BucketAggType).inherits(AggType);
  function BucketAggType(config) {
    // always append reversed nested, child, nested
    config.params.push(
      {
        name: 'reversedNested',
        default: false,
        write: _.noop
      },
      {
        name: 'child',
        default: '',
        write: _.noop
      },
      {
        name: 'nested',
        default: 0,
        write: _.noop
      },
      {
        name: 'aggNestedAndChild',
        editor: nestedAndChildTemplate
      }
    );

    BucketAggType.Super.call(this, config);

    if (_.isFunction(config.getKey)) {
      this.getKey = config.getKey;
    }
  }

  BucketAggType.prototype.getKey = function (bucket, key) {
    return key || bucket.key;
  };

  return BucketAggType;
}
