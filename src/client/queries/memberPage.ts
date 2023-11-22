import { gql } from '@apollo/client';
import { MEMBER_ALL_FIELDS } from '../fragments/memberFragment';
import { PAGINATION } from '../fragments/paginationFragment';
import { MEASURE_FRAGMENT_ALL_FIELDS } from '../fragments/measureFragment';

export const GET_MEMBER_DETAILS = gql`
  query getMemberDetails(
    $code: String!
    $take: Int
    $orderBy: MemberMeasuresOrderBy
  ) {
    getMember(code: $code) {
      ...memberAllFields
    }
  }
  ${MEMBER_ALL_FIELDS}
`;

export const GET_MEMBER_MEASURES = gql`
  query getMemberMeasures($input: GetMeasuresInput) {
    getMeasures(input: $input) {
      measures {
        ...MeasureAllFields
      }
      pagination {
        ...pagination
      }
    }
  }
  ${PAGINATION}
  ${MEASURE_FRAGMENT_ALL_FIELDS}
`;

export const GET_MEMBER_ATTENDANCE_LOG_BY_YEAR = gql`
  query getMemberAttendanceLogByYear($year: Int!, $memberCode: String!) {
    getMemberAttendanceLogByYear(year: $year, memberCode: $memberCode) {
      year
      month
      total
    }
  }
`;

export const GET_MEMBER_ATTENDANCE_LOG_DETAILS = gql`
  query getMemberAttendanceLogsDetails(
    $year: Int!
    $month: Int!
    $memberCode: String!
  ) {
    getMemberAttendanceLogsDetails(
      year: $year
      month: $month
      memberCode: $memberCode
    ) {
      classDate
      classDurationInMinutes
      classType
      isoTime
    }
  }
`;
