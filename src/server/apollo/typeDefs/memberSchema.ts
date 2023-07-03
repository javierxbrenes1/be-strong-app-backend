const memberSchema = `

	input MemberMeasuresOrderBy {
		date: String
	}

    type Member {
		code: String!
		name: String
		genre: String
		birthDate: Date
		height: Float
		isActive: Boolean
		phone: String
		email: String
		avatar: String
		observations: String
		preferredClassTime: Int
		memberAttendance: MemberAttendance
		memberMeasures(take: Int, orderBy: MemberMeasuresOrderBy): [MemberMeasure]
		gymClassTime: GymClassTime
	}

	type GetAllMembersResponse {
		members: [Member]
		pagination: Pagination
	}

	type Query {
		getAllMembers(offset: Int, limit: Int, ignore: [String]): GetAllMembersResponse @auth
		getMember(code: String): Member @auth
		getMembersCount: Int @auth
		getBirthdateMembers(date: Date): [Member] @auth
		getFilteredMembers(column: String, comparator: String, filter: String): [Member] @auth
	}

	input AddMemberInput {
		name: String!
		genre: String!
		birthDate: Date!
		height: Float!
		observations: String
		avatar: String
	}

	input UpdateMemberInput {
		code: String!
		name: String
		genre: String
		birthDate: Date
		height: Float
		isActive: Boolean
		phone: String
		email: String
		avatar: String
		observations: String
		memberAttendance: MemberAttendanceInput
		preferredClassTime: Int
	}

	type Mutation {
		addMember(member: AddMemberInput): Member @auth
		updateMember(member: UpdateMemberInput): Member @auth
	}
`;

export default memberSchema;
