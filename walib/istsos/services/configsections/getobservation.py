# -*- coding: utf-8 -*-
# istSOS WebAdmin - Istituto Scienze della Terra
# Copyright (C) 2012 Massimiliano Cannata, Milan Antonovic
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

from walib.resource import waResourceConfigurator, waResourceService

class waGetobservation(waResourceConfigurator):
    template = {
            "aggregatenodata" : ["getobservation","aggregate_nodata"],
            "maxgoperiod" : ["getobservation","maxGoPeriod"],
            "aggregatenodataqi" : ["getobservation","aggregate_nodata_qi"],
            "defaultqi" : ["getobservation","default_qi"],
            "correct_qi" : ["getobservation","correct_qi"],
            "stat_qi" : ["getobservation","stat_qi"],
            "transactional_log" :  ["getobservation","transactional_log"]
    }