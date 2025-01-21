package com.proj.forum.service;

import com.proj.forum.dto.SearchDto;

public interface SearchService {
    SearchDto findByName(String query);

}
