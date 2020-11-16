export interface IAttributeXml {
	name : string;
	value: string;
}

export interface IComponentXml {
	a : IAttributeXml[];
	$ : {
		lib : string;
		loc : string;
		name: string;
		[key: string]: string;
	},
}

export interface ICircuitXml {
	$   : { name: string };
	a   : IAttributeXml[];
	comp: IComponentXml[];
};

export interface ILogisimXml {
	project: {
		lib    : Object[];
		circuit: ICircuitXml[];
	}
};
