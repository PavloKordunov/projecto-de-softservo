package com.proj.forum.service.impl;

import com.proj.forum.dto.TagDto;
import com.proj.forum.entity.Tag;
import com.proj.forum.repository.TagRepository;
import com.proj.forum.service.TagService;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Autowired
    public TagServiceImpl(TagRepository tagRepository) {this.tagRepository = tagRepository;}

    @Override
    public List<TagDto> getAllTags(){
        List<Tag> all = tagRepository.findAll();
        log.info("getAllTags");

        return all.stream()
                .map(TagServiceImpl::getTagDto)
                .toList();
    };

    private static TagDto getTagDto(Tag tag) {
        if (tag == null) {
            log.info("no tag found");
            throw new EntityNotFoundException("no tag found");
        }
//        log.info("Creating tagDto");
        return TagDto.builder()
                .id(tag.getId())
                .name(tag.getName() == null ? StringUtils.EMPTY : tag.getName())
                .build();
    }
}
