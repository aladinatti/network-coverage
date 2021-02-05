export interface CoverageResponse {
    orange: Orange;
    sfr: SFR;
    free: Free;
    bouygue: Bouygue;
}

export interface Orange {
    _2G: boolean;
    _3G: boolean;
    _4G: boolean;
}

export interface SFR {
    _2G: boolean;
    _3G: boolean;
    _4G: boolean;
}

export interface Free {
    _2G: boolean;
    _3G: boolean;
    _4G: boolean;
}

export interface Bouygue {
    _2G: boolean;
    _3G: boolean;
    _4G: boolean;
}
