package com.proj.forum.service;

import com.proj.forum.dto.TagDto;

import java.util.List;
import java.util.UUID;

public interface TagService {
    List<TagDto> getAllTags();
    UUID createTag(TagDto tag);
    TagDto getTag(UUID id);

    List<TagDto> searchTags(String query);
}
