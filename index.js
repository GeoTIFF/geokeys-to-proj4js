// sources
proj4.defs("EPSG:3857","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");
proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");
proj4.defs("EPSG:32615","+proj=utm +zone=15 +datum=WGS84 +units=m +no_defs");

export function isUTM(geokeys) {
    const { ProjectedCSTypeGeoKey } = geokeys;
    if (ProjectedCSTypeGeoKey) {
        const projstr = ProjectedCSTypeGeoKey.toString();
        return projstr.startsWith('326') || projstr.startsWith('327');    
    } else {
        return false;
    }
}

export function getRadiusOfSemiMajorAxis(geokeys) {
    if (geokeys.ProjectedCSTypeGeoKey === 3857) {
        return 6378137;
    }
}

export function getRadiusOfSemiMinorAxis(geokeys) {
    if (geokeys.ProjectedCSTypeGeoKey === 3857) {
        return 6378137;
    }
}


export function getDatum(geokeys) {
    const {GeogCitationGeoKey, ProjectedCSTypeGeoKey } = geokeys;
    if (ProjectedCSTypeGeoKey === 4326 || GeogCitationGeoKey.includes('WGS 84') || GeogCitationGeoKey.includes('WGS84')) {
        return 'WGS84';
    }
}

export function getLatitudeOfTrueScale(geokeys) {
    if (geokeys.ProjectedCSTypeGeoKey === 3857) {
        return 0;
    }
}

export function getEllipsoidName(geokeys) {

}

export function getLatitudeOfOrigin(geokeys) {
    if (geokeys.ProjectedCSTypeGeoKey = 3857) {
        return 0;
    }
}

export function getLatitudeOfFirstStandardParallel(geokeys) {

}

export function getLatitudeOfSecondStandardParallel(geokeys) {
    
}

export function getCentralMeridian(geokeys) {
    if (geokeys.ProjectedCSTypeGeoKey = 3857) {
        return 0;
    }    
}

export function getOver(geokeys) {

}

export function getProj(geokeys) {
    const { ProjectedCSTypeGeoKey } = geokeys;
    if (ProjectedCSTypeGeoKey === 4326) {
        return 'longlat';
    } else if (ProjectedCSTypeGeoKey = 3857) {
        return 'merc';
    } else if (isUTM(geokeys)) {
        return 'utm';
    }
}

export function getUnits(geokeys) {
    if (geokeys.ProjLinearUnitsGeoKey === 9001) {
        return 'm';
    } // return degrees
}

export function isSouth(geokeys) {
    if (isUTM(geokeys)) {
        return geokeys.ProjectedCSTypeGeoKey.toString().startsWith('327');
    }
}

export function getFalseEasting(geokeys) {

}

export function getFalseNothing(geokeys) {

}

export function getZone(geokeys) {
    if (isUTM(geokeys)) {
        const projstr = geokeys.ProjectedCSTypeGeoKey.toString();
        if (projstr.startsWith('326') || projstr.startsWith('327')) {
            return Number.parseInt(projstr.substring(3));
        } 
    }
}

export default function getProj4js(geokeys) {
    const a = getMajorAxis(geokeys);
    const b = getMinorAxis(geokeys);
    const datum = getDatum(geokeys);
    const proj = getProj(geokeys);
    const units = getUnits(geokeys);
    const lat_ts = getLatitudeOfTrueScale(geokeys);
    const lat_0 = getLatitudeOfOrigin(geokeys);
    const lat_1 = getLatitudeOfFirstStandardParallel(geokeys);
    const zone = getZone(geokeys);

    const result = '';
    if (proj) result += ` +proj=${proj}`;
    if (zone) result += ` +zone`;
    if (datum) result += ` +datum=${datum}`;
    if (a) result += ` +a=${a}`;
    if (b) result += ` +b=${b}`;
    if (lat_0) result += ` +lat_0=${lat_0}`;
    if (lat_1) result += ` +lat_1=${lat_1}`;
    if (isSouth(geokeys)) result += ` +south`;

    result += ' +no_defs';
    result = result.trim();
    return result;
}