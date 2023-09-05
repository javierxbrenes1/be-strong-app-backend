import { gql } from '@apollo/client';
import { GYM_CLASS_ALL_FIELDS } from '../fragments/gymClassFragment';

export const GET_CLASSES_BY_DATE = gql`
  query getGymClasses($gte: String!, $lt: String!) {
    getGymClasses(gte: $gte, lt: $lt) {
      ...getGymClassAllFields
    }
  }
  ${GYM_CLASS_ALL_FIELDS}
`;
